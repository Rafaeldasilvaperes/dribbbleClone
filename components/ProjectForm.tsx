"use client"

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import { ChangeEvent } from "react";
import FormField from "./FormField";

type Props = {
  type: string,
  session: SessionInterface,
}

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) =>{};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
  const handleStateChange = (fieldName: string, value: string) => {};


  const image = null;
  const form = {
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
  };

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
      {/* CustomInput Category for later... */}

      <div className="flexStart w-full">
        <button className="px-10 py-2 bg-violet-500 text-white rounded-sm hover:bg-violet-800 active:bg-violet-300 active:text-black-100">Create</button>
      </div>
    </form>
  )
}

export default ProjectForm;