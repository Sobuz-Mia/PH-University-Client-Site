import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
interface TDataType {
  status: string;
  startDate: string;
  endDate: string;
}
const RegisteredSemesters = () => {
  const { data: resisteredSemester, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);

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
  const handleMenuDropdown = (data) => {
    console.log(data);
  };
  const menuProps = {
    items,
    onClick: handleMenuDropdown,
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
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
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
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;
