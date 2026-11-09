"use server";

import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { PaginatedSearchParamsSchema } from "../validations";
import Tag from "@/database/tag.model";

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
