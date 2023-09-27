import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

// ******** ENVIROMENTS ********
const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letMeIn';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000/';
// ******** ENVIROMENTS ********


const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables)
  } catch (error) {
    throw error;
  }
}
// GET ONE USER
export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
}
// CREATE ONE USER
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};
// GET THE TOKEN
export const fetchToken = async () => {
  try {
    // this path is were nextauth publishes the tokens automatically
    const response = await fetch(`${serverUrl}/api/auth/token`);
    
    return response.json();
  } catch (error) {
    throw error;
  }
}
// UPLOAD THE IMAGE
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath })
    })

    return response.json();

  } catch (error) {

    throw error;
    
  }
}
// CREATE ONE NEW PROJECT
  export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
      client.setHeader("Authorization", `Bearer ${token}`);
      const variables = {
        input: {
          ...form,
          image: imageUrl.url,
          createdBy: {
            link: creatorId
          }
        }
      }

      return makeGraphQLRequest(createProjectMutation, variables)
    }
  }

  export const fetchAllProjects = async (category?: string, endcursor?: string) => {

    client.setHeader('x-api-key', apiKey);

    return makeGraphQLRequest(projectsQuery, { category, endcursor });

  }

  // GET ONE PROJECT DETAILS by ID for project page
  export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id })
  }

  // GET ALL PROJECTS BY ONE USER
  export const getUserProjects = (id: string, last?: number) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last})
  }

  // DELETE ONE PROJECT BY ID
  export const deleteProject = (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id})
  }

  // EDIT ONE PROJECT BY ID
  export const updateProject = async (form: ProjectForm, projectId: string , token: string) => 
  {

    function isBase64DataURL(value: string)
    {
      const base64Regex = /^data:image\/[a-z]+;base64,/;
      return base64Regex.test(value);
    }

    let updatedForm = {...form};

    const isUploadingNewImage = isBase64DataURL(form.image);

    if(isUploadingNewImage){
      const imageUrl = await uploadImage(form.image);

      if(imageUrl.url)
      {
        updatedForm = 
        {
          ...form,
          image: imageUrl.url
        }
      }
    }

    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = 
    {
      id: projectId,
      input: updatedForm,
    }

    

    return makeGraphQLRequest(updateProjectMutation, variables);
  }