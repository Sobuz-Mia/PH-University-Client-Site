import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import {
  useAddCoursesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../type/global";
import { TCourse } from "../../../type";

const CreateCourse = () => {
  const [createCourse] = useAddCoursesMutation();
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const preRequisiteCoursesOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  // onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating........");
    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data?.code),
      credits: Number(data?.credits),
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: Partial<TCourse>) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something want wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput label="Title" type="text" name="title" />
          <PHInput label="Prefix" type="text" name="prefix" />
          <PHInput label="Code" type="text" name="code" />
          <PHInput label="Credits" type="text" name="credits" />
          <PHSelect
            label="PreRequisiteCourses"
            name="preRequisiteCourses"
            mode="multiple"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateCourse;
