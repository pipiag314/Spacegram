import { createPostValidation } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input";
import FileUploader from "../shared/FileUploader";

const PostForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof createPostValidation>>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      file: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createPostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Caption" {...field} className="input custom-scrollbar" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photo</FormLabel>
              <FormControl>
                <FileUploader />
                {/* <Input  placeholder="Caption" {...field} className="input custom-scrollbar" /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags, separate them with comma (",")</FormLabel>
              <FormControl>
                <Input  placeholder="Caption" {...field} className="input custom-scrollbar" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-5 items-center">
            <Button type="button" className="">Cancel</Button>
            <Button type="submit" className="button-primary">Submit</Button>
        </div>
      </form>
    </Form>
  )
};
export default PostForm;
