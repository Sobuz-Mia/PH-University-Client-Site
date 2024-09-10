import { TRegisteredSemester } from "../../../type";
import { TQueryParam, TResponseRedux } from "../../../type/global";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      // get limited data using transformResponse
      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        // console.log(response);
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
} = courseManagementApi;
