// Here We are using control, onChange

import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, SelectBtn, RTE } from '../index'
import storageServiceServer from '../../Appwrite/storageService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {
  {/*
  -> First of all we need some information from useForm, useForm gives us watch also. Watch provides watching capabilities 
    if we want to watch any field continously
  -> useForm gives us setValue, In any form we cannot set hte value by writing value because we are using react form.. So this is the way in 
    which values will be setting
  ->useForm also gives control to us, and this is the control that we pass in RTE as it is. And from there(RTE) we got the control of 
    syntax etc.
  -> useForm gives us the getValues, If we want to grab the any value from the form we can grab that using this. 

  -> We pass default values in as an object in useForm   
*/}
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({

    // Now we will see that how to write / define the defaultValues, But for default values we need some information. 
    // So we have to raise a query on this form because it is possible that user wants to edit the post or make new post / values.
    // If the user wants to make new post/value then we can let the title empty, But if the user comes to edit the post then we have to pass the 
    // default values to the title, default values are those values which comes from the database or appwrite.
    // Also we will get the values from the user by {post} prop that the user passes when the user submit the form.  

    defaultValues: {
      // Now if there is post then we will use the title of the post, if there is no post then the title will be empty 
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  // We will use the navigation
  const navigate = useNavigate();

  // we need userData also
  const userData = useSelector((state) => state.auth.userData);


  // There are two situation rises when the user submits the form 
  // If there is post passed by the user it means we have to update the post, 
  // To update the post we have to handle the file, And to handle the file already made uploadFile() in appwrite
  // We can make the forms like that the it can accepts the data.

  // We made submit function and we defined both situation in it when user submit the form.

  const submit = async (data) => {
    if (post) {
      // Data gives us access of the featuredImage, which is an array which supports multiple featuredImages, Here we need first featuredImage only
      // Now if we have featuredImage then we will update the file by passing the data's 1st featuredImage to the uploadFile() from the appwrite storage Service
      // We will store the updated file in a variable {file}
      const file = data.image[0] ? await storageServiceServer.uploadFile(data.image[0]) : null;

      // Now when we got the uploaded file, But we have to delete the old featuredImage of data/file after uploading
      // Now we will perform the deletion if we the file get uploaded
      if (file) {
        // We are storing/using the IDs in/as post.featuredImage to delete the files
        storageServiceServer.deleteUpload(post.featuredImage);
      }

      // So we uploaded the file and deleted the file successfully then we have to update the file also, to update post we have updatePost()
      // We are passing {slug} as ID which we can pass {$id} for the updation of post and the data with spread operator of post.
      const dbPost = await storageServiceServer.updatePost(post.$id, {
        ...data,
        // We have to overwrite the field which is featuredImage 
        // if file is present then we will put the $id in featuredImage if not then make undefined
        featuredImage: file ? file.$id: undefined,

        // Now if we get the dbPost and all the tasks completed succesfully navigate user to the post
      })
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }

    }

    // The above is the situation where we have the post or data passed by the user
    // But below we have the situation whwn we don't have the post or data from the user.x 
    else {
      // Here user wants to create new form, So first we have to upload file 
      const file = await storageServiceServer.uploadFile(data.image[0]);

      if (file) {
        // new ID is created for the image which is uploading
        const fileId = file.$id;
        // setting the new ID of image into featuredImage ID below
        data.featuredImage = fileId;

        // Now we will send the remaining properties, We will send the data in object with spread operator in createPost of storage service of appwrite
        const dbCreatePost = storageServiceServer.createPost({ ...data, userId: userData.$id});

        if (dbCreatePost) {
          // Now if the post has been created then we navigate the user to the post
          navigate(`/post/${dbCreatePost.$id}`);
        }


      }
    }
  }



  // Now we are making a method which is slugTransform. We have to input fields 1st is titleand 2nd is slug.
  // We have to watch the title and have to generate value in slug like - title -> first project, slug -> first-project
  // Here we are converting the space into dash in slug value, to do such task we are using regex

  const slugTransform = useCallback((value) => {
    // If there is value and the value is string then we return the slug
    if (value && typeof value === "string") {
      // first we trim the string and convert them to lower case then we replace with the regex
      return value
        .trim()
        .toLowerCase()
        .replace(/^ [a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    else {
      // else return empty string
      return "";
    }
  }, []);


  // To utilize the slugtrnasformation we are using useEffect()
  useEffect(() => {
    // To watch any values, Here we make a subscription, It makes with watch method, There are other methods also to subscribe and unsubscribe.
    // So we have to hold that watch method into a variable, watch method is giving a callback. 
    // In callback we will get {value} S OBJECT and we get {name}
    const subscription = watch((value, { name }) => {
      // If our name is title
      if (name === "title") {
        setValue("slug", slugTransform(value.title),

          // Now we will implement validation here
          { shouldValidate: true });
      }
    });

    // Then we can give a callback in return. We are doing this for memory management also to prevent from the infinte loop   
    return () => subscription.unsubscribe();
  },
    // We implement the watch on title in registers in our form, slugTrnsform and setValues
    [watch, slugTransform, setValue]);

  return (
    // Now we will implement form, Form is divided in two sided parts, 1st part is 2/3 and 3nd is 1/3 
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultvalue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageServiceServer.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectBtn
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm