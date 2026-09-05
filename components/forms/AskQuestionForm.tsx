"use client";

import { AskQuestionSchema } from "@/lib/validations";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "../ui/field";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor/index"), {
  ssr: false,
});

function AskQuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [tagInput, setTagInput] = useState("");
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  function handleKeydown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      const inputValue = tagInput.trim();

      if (
        inputValue &&
        inputValue.length < 15 &&
        !field.value.includes(inputValue)
      ) {
        form.setValue("tags", [...field.value, inputValue]);
        setTagInput("");
        form.clearErrors("tags");
      } else if (inputValue.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(inputValue)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  }

  function handleRemoveTag(tag: string, field: { value: string[] }) {
    const updatedTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", updatedTags);
  }

  return (
    <Card className="background-light850_dark100">
      <CardHeader>
        <CardTitle>
          <h1 className="h2-semibold sm:h1-bold text-dark100_light900 mt-4">
            Ask a public question
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="mt-6 flex flex-col gap-4 sm:mt-9">
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="QuestionTitle"
                    className="text-dark100_light900 paragraph-semibold text-sm sm:text-base"
                  >
                    Question Title
                    <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="QuestionTitle"
                    className="background-light800_dark300 text-dark100_light900 placeholder:text-dark300_light600 mt-1 h-13 rounded-lg border-none px-4 text-sm outline-none md:text-xl"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <FieldDescription className="sm:body-regular text-light-500 mt-1 text-xs sm:mt-2">
                    Be specific and imagine you’re asking a question to another
                    person.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="Question description"
                    className="text-dark100_light900 paragraph-semibold text-sm sm:text-base"
                  >
                    Detailed explanation of your problem?
                    <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Editor
                    value={field.value}
                    fieldChange={field.onChange}
                    editorRef={editorRef}
                  />
                  <FieldDescription className="sm:body-regular text-light-500 mt-1 text-xs sm:mt-2">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="tags"
                    className="text-dark100_light900 paragraph-semibold text-sm sm:text-base"
                  >
                    Tags
                    <span className="text-primary-500">*</span>
                  </FieldLabel>
                  <Input
                    name={field.name}
                    ref={field.ref}
                    value={tagInput}
                    id="tags"
                    className="background-light800_dark300 text-dark100_light900 placeholder:text-dark300_light600 mt-1 h-13 rounded-lg border-none px-4 text-sm outline-none md:text-xl"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    onBlur={field.onBlur}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => handleKeydown(e, field)}
                  />
                  <FieldDescription className="sm:body-regular text-light-500 mt-1 text-xs sm:mt-2">
                    Add up to 5 tags to describe what your question is about.
                    Start typing to see suggestions.
                  </FieldDescription>
                  <div className="flex flex-wrap gap-2">
                    {field?.value?.map((tag) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleRemoveTag(tag, field)}
                      />
                    ))}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="primary-gradient sm:paragraph-medium paragraph-regular hover:bg-primary-600 mt-9 mr-5 ml-auto w-fit cursor-pointer rounded-sm border-none px-4 py-1.5 text-white transition-colors outline-none sm:px-7 sm:py-6"
            onClick={() => form.reset()}
          >
            Ask a Question
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default AskQuestionForm;
