import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
interface TDataType {
  status: string;
  startDate: string;
  endDate: string;
}
const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: resisteredSemester, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [updateSemester] = useUpdateRegisteredSemesterMutation();
  const tableData = resisteredSemester?.data?.map(
    ({ _id, status, startDate, endDate, academicSemester }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const items = [
    {
      label: "Upcoming",
      key: "UPCOMING",
    },
    {
      label: "Ongoing",
      key: "ONGOING",
    },
    {
      label: "Ended",
      key: "ENDED",
    },
  ];
  const handleMenuUpdate: MenuProps["onClick"] = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data?.key,
      },
    };
    updateSemester(updateData);
  };
  const menuProps = {
    items,
    onClick: handleMenuUpdate,
  };
  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;
