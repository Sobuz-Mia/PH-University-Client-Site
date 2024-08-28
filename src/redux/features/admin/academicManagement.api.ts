import { TAcademicManagement } from "../../../type/academicManagement.type";
import { TResponseRedux } from "../../../type/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      // get limited data using transformResponse
      transformResponse: (response: TResponseRedux<TAcademicManagement[]>) => {
        // console.log(response);
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemesterQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
