import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { statusOptions } from "../../../constants/semester";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../type/global";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item?._id,
    label: `${item?.name} ${item?.year}`,
  }));
  // onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating........");
    const semesterData = {
      ...data,
      maxCredit: Number(data?.maxCredit),
      minCredit: Number(data?.minCredit),
    };
    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log(res);
    } catch (err) {
      toast.error("Something want wrong", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect label="Status" name="status" options={statusOptions} />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput label="Max Credit" type="text" name="maxCredit" />
          <PHInput label="Min Credit" type="text" name="minCredit" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default SemesterRegistration;
