import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudentData } from "../../../type";
import { Link } from "react-router-dom";
type TStudentDataType = Pick<
  TStudentData,
  "fullName" | "id" | "email" | "contactNo"
>;
const StudentData = () => {
  // const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const metaData = studentData?.meta;

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
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Pagination
        current={page}
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default StudentData;
