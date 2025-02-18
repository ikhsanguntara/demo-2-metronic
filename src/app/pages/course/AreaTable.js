import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  sortCaret,
  headerSortingClasses,
  PleaseWaitMessage,
  NoRecordsFoundMessage,
} from "../../../_metronic/_helpers";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  formatCurrency,
  replaceNulls,
  showDeleteDialog,
  showErrorDialog,
  showSuccessDialog,
  sizePerPageList,
} from "../../utility";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { removeById } from "./courseSlice";

export const AreaTable = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Add number
    const pageBefore = sizePerPage * (page - 1);
    const initData = data.map((item, index) => {
      const newItem = replaceNulls(item);
      return {
        ...newItem,
        no: index + 1 + pageBefore,
      };
    });

    console.log(initData);
    setTableData(initData);
  }, [data, sizePerPage, page]);

  const [tableData, setTableData] = useState(data);

  const actionFormatter = (e, row) => {
    return (
      <div>
        <OverlayTrigger
          overlay={<Tooltip id="Uoms-edit-tooltip">Edit</Tooltip>}
        >
          <div
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1 my-1"
            onClick={() => {
              history.push(`/master/area/edit/${row.principal_area_id}`);
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-secondary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")} />
            </span>
          </div>
        </OverlayTrigger>
      </div>
    );
  };

  const columns = [
    {
      text: "No",
      dataField: "no",
      style: { minWidth: "60px" },
    },
    {
      text: "code",
      dataField: "area_code",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "180px" },
    },
    {
      text: "name",
      dataField: "area_name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "180px" },
    },

    {
      text: "Action",
      dataField: "action",
      align: "center",
      formatter: actionFormatter,
    },
  ];

  const handleDelete = async (row) => {
    const id = { uom_id: `${row.uom_id}` };

    const action = await showDeleteDialog(
      `Are you sure want to delete?<br><strong>${row.uom_description}</strong>`
    );
    if (action.isConfirmed) {
      try {
        const response = await dispatch(removeById(id));
        if (response.payload.status === 200) {
          const action = await showSuccessDialog(response.payload.data.message);
          await window.location.reload();
        } else {
          showErrorDialog(response.payload.data.message);
        }
      } catch (error) {
        console.log(error);
        showErrorDialog("Something went wrong!");
      }
    }
  };

  const options = {
    page: page,
    sizePerPage: sizePerPage,
    showTotal: true,
    totalSize: totalSize,
    sizePerPageList: sizePerPageList(totalSize),
  };
  return (
    <>
      <BootstrapTable
        remote
        striped
        noDataIndication="Data Not Found"
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={true}
        keyField="no"
        data={tableData}
        columns={columns}
        pagination={paginationFactory(options)}
        onTableChange={onTableChange}
        hover
      >
        <PleaseWaitMessage entities={loading ? null : tableData} />
        <NoRecordsFoundMessage entities={loading ? null : tableData} />
      </BootstrapTable>
    </>
  );
};
