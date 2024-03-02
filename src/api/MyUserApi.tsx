import { User } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    //1)get the response
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    //2)Check the response
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    //3) return response
    return response.json();
  };

  const {data: currentUser,isLoading,error,} = useQuery("fetchCurrentUser", getMyUserRequest);

  //toast is display popup massage
  if (error) {
    toast.error(error.toString()); 
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

//create user
export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {// create user from api
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
  
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };

    const {mutateAsync: createUser,isLoading,isError, isSuccess,} = useMutation(createMyUserRequest); //useMutation hook to manage the state of the asynchronous operation 

    return{
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
}

type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
//update user
export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "PUT", // Specifies the HTTP method as PUT
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sets the Authorization header with the access token
          "Content-Type": "application/json", // Specifies the content type as JSON
        },
        body: JSON.stringify(formData), // Converts the form data to a JSON string and sets it as the request body
      });
      
      // Handle the response
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
  
      return response.json();
    };
  
    const {
      mutateAsync: updateUser,isLoading,isSuccess,error,reset,} = useMutation(updateMyUserRequest);
  
    if (isSuccess) {
      toast.success("User profile updated!");
    }
  
    if (error) {
      toast.error(error.toString());
      reset();
    }
  
    return { updateUser, isLoading };
  };