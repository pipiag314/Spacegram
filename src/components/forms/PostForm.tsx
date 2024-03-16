import { createPostValidation } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input";
import FileUploader from "../shared/FileUploader";
import { ID, Models } from "appwrite";
import { useCreatePost } from "@/lib/query/mutations";
import { useUserContext } from "@/context/UserContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
  post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps) => {

  const { mutateAsync: createPost, isPending: isCreatingPost} = useCreatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  
  const navigate = useNavigate();
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof createPostValidation>>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      file: [],
      caption: post ? post?.caption : "",
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createPostValidation>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    })

    if(!newPost) {
      toast({
        title: "Something went wrong, try again later."
      })
    } else {
      toast({
        title: "Post uploaded succesfully."
      })
    }

    navigate("/");
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
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                {/* <Input  placeholder="Caption" {...field} className="input custom-scrollbar" /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a location</FormLabel>
              <FormControl>
                <Input  placeholder="location" {...field} className="input" />
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
                <Input  placeholder="Caption" {...field} className="input" />
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
