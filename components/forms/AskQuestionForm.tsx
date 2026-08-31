"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { Field } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

const Editor = dynamic(() => import("@/components/editor/index"), {
  ssr: false,
});

function AskQuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  return (
    <form className="mt-6 flex flex-col gap-4 sm:mt-9">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-dark100_light900">
          Question Title <span className="text-primary-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          className="background-light800_dark300 text-dark100_light900 placeholder:text-dark300_light600 mt-1 h-13 rounded-lg border-none px-4 outline-none"
          {...form.register("title")}
        />
        <p className="sm:body-regular text-light-500 mt-2.5 text-xs">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="content" className="text-dark100_light900">
          Detailed explanation of your problem?{" "}
          <span className="text-primary-500">*</span>
        </label>
        <Controller
          name="content"
          control={form.control}
          render={({ field }) => (
            <Editor
              value={field.value}
              fieldChange={field.onChange}
              editorRef={editorRef}
            />
          )}
        />
        <p className="sm:body-regular text-light-500 mt-2.5 text-xs">
          Be specific and imagine you&apos;re asking a question to another
          person.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="tags" className="text-dark100_light900">
          Tags <span className="text-primary-500">*</span>
        </label>

        <input
          type="text"
          className="background-light800_dark300 text-dark100_light900 placeholder:text-dark300_light600 mt-1 h-12 rounded-lg border-none px-4 outline-none sm:h-13"
          id="tags"
          {...form.register("tags")}
        />
        <p className="sm:body-regular text-light-500 mt-2.5 text-xs">
          Add up to 5 tags to describe what your question is about. Start typing
          to see suggestions.
        </p>
      </div>
      <button
        type="submit"
        className="primary-gradient hover:bg-primary-600 mt-9 mr-5 ml-auto w-fit cursor-pointer rounded-lg border-none px-5 py-2 text-white transition-colors outline-none"
      >
        Submit
      </button>
    </form>
  );
}

export default AskQuestionForm;
