import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../type/global";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudentData } from "../../../type";
type TStudentDataType = Pick<
  TStudentData,
  "fullName" | "id" | "email" | "contactNo"
>;
const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: studentData, isFetching } = useGetAllStudentQuery(params);

  const tableData = studentData?.data?.map(
    ({ _id, fullName, email, contactNo, id }) => ({
      key: _id,
      fullName,
      email,
      contactNo,
      id,
    })
  );

  const columns: TableColumnsType<TStudentDataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Student Roll",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TStudentDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default StudentData;
