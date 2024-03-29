import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/me/update",
        method: "PUT",
        body,
      }),
    }),
    updateSession: builder.query({
      query: () => ({
        url: "/auth/session?update",
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/me/update_password",
        method: "PUT",
        body,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "PUT",
        body,
      }),
    }),
    updateUserDetails: builder.mutation({
      query: ({id, body}) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useLazyUpdateSessionQuery,
  useUpdatePasswordMutation,
  useUploadAvatarMutation,
  useUpdateUserDetailsMutation,
  useDeleteUserMutation
} = userApi;
