"use client"

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) =>{};


  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // avoid reload on the page
    const file = e.target.files?.[0];
    if(!file) return;

    if(!file.type.includes('image')){
      return alert('Please update an image file!')      
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);
    }
  };

  const handleStateChange: any = (fieldName: string, value: string) => {
    setform((prevState) => ({
      ...prevState, [fieldName]: value
    }))
  };

 const [isSubmitting, setisSubmitting] = useState(false);
 const [form, setform] = useState({
  title: '',
  description: '',
  image: '',
  liveSiteUrl:'',
  githubUrl: '',
  category: '',
 })

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form"
    >
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input 
        type="file" 
        name="" 
        id="image" 
        accept="image/*"
        required={type === 'create' ? true : false}
        className="form_image-input"
        onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>

      <FormField 
        title="Title"
        state={form.title}
        placeholder="The Title for my Awesome New Project!"
        setState={(value: string) => handleStateChange('title',value)}
      />
      <FormField 
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable new developer projects!"
        setState={(value: string) => handleStateChange('description',value)}
      />
      <FormField 
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://myAwesomeSiteUrl.wow"
        setState={(value: string) => handleStateChange('liveSiteUrl',value)}
      />
      <FormField 
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/yourNameHere"
        setState={(value: string) => handleStateChange('githubUrl',value)}
      />
      
      <CustomMenu 
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">

          <Button            
            title={
              isSubmitting 
              ? `${type === 'create' ? 'Creating':'Editing'}` 
              : `${type === 'create' ? 'Create' : 'Edit'}`}
            type='submit'
            leftIcon={isSubmitting ? "" : '/plus.svg'}
            // rightIcon={isSubmitting ? "" : '/plus.svg'}
            isSubmitting={isSubmitting} />

        {/* <button className="px-10 py-2 bg-violet-500 text-white rounded-sm hover:bg-violet-800 active:bg-violet-300 active:text-black-100">Create</button> */}

      </div>
    </form>
  )
}

export default ProjectForm;