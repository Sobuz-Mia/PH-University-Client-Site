import { TStudentData } from "../../../type";
import { TQueryParam, TResponseRedux } from "../../../type/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      // get limited data using transformResponse
      transformResponse: (response: TResponseRedux<TStudentData[]>) => {
        // console.log(response);
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentQuery } =
  userManagementApi;
