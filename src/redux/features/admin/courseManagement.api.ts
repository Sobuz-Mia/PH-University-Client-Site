import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllSemester: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   // get limited data using transformResponse
    //   transformResponse: (response: TResponseRedux<TAdmissionSemester[]>) => {
    //     // console.log(response);
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // getAcademicDepartment: builder.query({
    //   query: () => ({
    //     url: "/academic-departments",
    //     method: "GET",
    //   }),
    //   // get limited data using transformResponse
    //   transformResponse: (response: TResponseRedux<TAdmissionSemester[]>) => {
    //     // console.log(response);
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddRegisteredSemesterMutation } = courseManagementApi;
