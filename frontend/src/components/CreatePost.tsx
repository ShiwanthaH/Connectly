import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPost, getPosts } from "../services/postServices";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  //   titleColor: Yup.string().required("Please select a title color"),
});

interface FormValues {
  title: string;
  content: string;
  titleColor: string;
}

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
}

const CreatePostModal = ({ open, setOpen, handleOpen }: props) => {
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    title: "",
    content: "",
    titleColor: "",
  };

  const colors = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
  ];

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    const data = await createPost(values?.title, values?.content);
    const newPosts = await getPosts();
    if (data) {
      dispatch({
        type: "SET_POSTS",
        payload: newPosts,
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="md" className="rounded-lg">
        <DialogHeader>New Post</DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <DialogBody className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    as={Input}
                    placeholder="Enter the title"
                    className="mt-1 w-full"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium"
                  >
                    Content
                  </label>
                  <Field
                    name="content"
                    as="textarea"
                    rows="4"
                    placeholder="Enter the content"
                    className="mt-1 w-full border p-2 rounded-md"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="titleColor"
                    className="block text-sm font-medium"
                  >
                    Title Color
                  </label>
                  <Field name="titleColor" as={Select} className="w-full mt-1">
                    {colors.map((color) => (
                      <Option key={color.value} className="flex items-center">
                        <div
                          className="w-[12px] h-[12px] rounded-full mr-2"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        {color.label}
                      </Option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="titleColor"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              </DialogBody>

              <DialogFooter>
                <Button
                  onClick={handleOpen}
                  color="red"
                  variant="outlined"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit" color="blue-gray" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CreatePostModal;
