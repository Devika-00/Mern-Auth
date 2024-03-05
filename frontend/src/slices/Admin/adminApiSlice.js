import { apiSlice } from "../apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminlogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    admindeleteuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/deleteuser`,
        method: "DELETE",
        body: data,
      }),
    }),
    adminupdateuser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateuser`,
        method: "PUT",
        body: data,
      }),
    }),
    adminadduser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adduser`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminloginMutation,
  useAdminlogoutMutation,
  useAdmindeleteuserMutation,
  useAdminupdateuserMutation,
  useAdminadduserMutation
} = adminApiSlice;
