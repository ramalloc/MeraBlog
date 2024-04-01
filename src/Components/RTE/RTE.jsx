// RTE -> real time editor,

import React from 'react'
// We have to import Editor from tniy-mce
import { Editor } from '@tinymce/tinymce-react'
// import envImporter from '../../Config/envImporter.js'

{/*We will use this component in many other components. So we have to get the reference of it to use it.
Here we are using Controller*/}
import { Controller } from 'react-hook-form'

// We want two things as prop 1st is name and 2nd is control, control is comes from react-hook-form and this control is responsible
// for sending the state and data from here to form. when we use the RTE we will pass this control over there in that component. 
const RTE = ({ name, control, label, defaultvalue = "" }) => {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      {/* Now we will use Controller  
        -> Controller gives some properties like 
        name, control - It is the control which is defined by parent component, rule- We can define rules also, 
        render - 
      */}

      <Controller
        name={name || "content"}
        control={control}
        // Now we will see how elements or components render here. It takes a callback function, 
        // And We have to give fields in curly braces and we stick a tracking on it in curly braces means we have to define the event.
        // If there is any change with the given event in field then it will inform parent component with render. 
        render={({ field: { onChange } }) => (
          // Now here will pass the component or element we want render
          <Editor
            // apiKey={envImporter.tinyAPi}
            initialValue={defaultvalue}
            init={{
              initialValue: defaultvalue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}

export default RTE 