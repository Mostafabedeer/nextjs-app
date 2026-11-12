"use server";

import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
  GetTagQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "../validations";
import Tag from "@/database/tag.model";
import { Question } from "@/database";

export async function getTags(
  params: PaginatedQuestionsParams,
): Promise<ActionResponse<{ tags: Tag; isNext: boolean }>> {
  const validatedResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const limit = Number(pageSize);
  const skip = (Number(page) - 1) * limit;

  const filterQuery: QueryFilter<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCreteria = {};

  switch (filter) {
    case "popular":
      sortCreteria = { questions: -1 };
      break;
    case "newest":
      sortCreteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCreteria = { createdAt: 1 };
      break;
    case "name":
      sortCreteria = { name: 1 };
      break;

    default:
      sortCreteria = { questions: -1 };
  }

  try {
    const tags = await Tag.find(filterQuery)
      .sort(sortCreteria)
      .skip(skip)
      .limit(limit + 1);
    const totalTags = await Tag.countDocuments(filterQuery);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTagQuestions(
  params: GetTagQuestionsParams,
): Promise<
  ActionResponse<{ tag: Tag; questions: Question[]; isNext: boolean }>
> {
  const validatedResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validatedResult instanceof Error) {
    return handleError(validatedResult) as ErrorResponse;
  }

  const { tagId, page = 1, pageSize = 10, query } = params;
  const limit = Number(pageSize);
  const skip = (Number(page) - 1) * limit;

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const filterQuery: QueryFilter<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }
    const questions = await Question.find(filterQuery)
      .select("_id author downvotes upvotes title views answers createdAt")
      .populate([
        {
          path: "author",
          select: "name image",
        },
        {
          path: "tags",
          select: "name",
        },
      ])

      .skip(skip)
      .limit(limit + 1);
    const totalQuestions = await Question.countDocuments(filterQuery);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
