import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "PUT",
        body,
      }),
    }),
    canUserReview: builder.query({
      query: (id) => ({
        url: `/reviews/can_review?roomId=${id}`,
      }),
    }),
    newRoom: builder.mutation({
      query: (body) => ({
        url: "/admin/rooms",
        method: "POST",
        body
      })
    }),
    updateRoom: builder.mutation({
      query: ({id, body}) => ({
        url: `/admin/rooms/${id}`,
        method: "PUT",
        body
      })
    }),
    uploadRoomImages: builder.mutation({
      query: ({id, body}) => ({
        url: `/admin/rooms/${id}/upload_images`,
        method: "PUT",
        body
      })
    }),
    deleteRoomImage: builder.mutation({
      query: ({id, body}) => ({
        url: `/admin/rooms/${id}/delete_image`,
        method: "PUT",
        body
      })
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/admin/rooms/${id}`,
        method: "DELETE",
      })
    }),
  }),
});

export const {
  usePostReviewMutation,
  useCanUserReviewQuery,
  useNewRoomMutation,
  useUpdateRoomMutation,
  useUploadRoomImagesMutation,
  useDeleteRoomImageMutation,
  useDeleteRoomMutation
} = roomApi;