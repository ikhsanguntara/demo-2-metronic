import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderTitle,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editItem,
  fetchId,
  fetchIdNoloading,
  selectId,
  selectLoading,
  uploadItem,
  uploadValidate,
} from "./courseSlice";
import { useHistory, useParams } from "react-router";
import {
  showSuccessDialog,
  showErrorDialog,
  GOOGLE_KEY,
  allDay,
  getValueStatus,
  createChangeHandler,
  CallApi,
  showDialog,
  formatterStatus,
  checkEmptyFields,
  paramsMasterAll,
} from "../../utility";
import { LayoutSplashScreen } from "../../../_metronic/layout";
import { Marker } from "../../utility/Marker";
import GoogleMapReact from "google-map-react";
import Select from "react-select";
import { selectUser } from "../../modules/Auth/_redux/authRedux";
import { headerSortingClasses, sortCaret } from "../../../_metronic/_helpers";
import BootstrapTable from "react-bootstrap-table-next";
import { fetchTemplate, selectLoadingTemplate } from "../product/productSlice";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { fetchCompany, selectDataCompany } from "../company/companySlice";
import { Hidden } from "@material-ui/core";

export const CourseCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectLoading);
  const loading2 = useSelector(selectLoadingTemplate);
  const user = useSelector(selectUser);
  const dataId = useSelector(selectId);
  const dataCompany = useSelector(selectDataCompany);
  const { id } = useParams();
  const ref = useRef();
  const { SearchBar } = Search;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const paramsId = {
    principal_area_id: id,
  };

  useEffect(() => {
    async function fetchMyAPI() {
      if (id !== undefined) {
        await CallApi(paramsId, fetchId, dispatch);
      } else {
        const initData = user?.user_companies?.map((item, index) => ({
          ...item,
          no: index + 1,
          is_checked: false,
        }));
        setTableData(initData);
      }
    }
    fetchMyAPI();
  }, [dispatch]);

  useEffect(() => {
    if (dataId) {
      setName(dataId.area_name);
      setCode(dataId.area_code);

      const initData = dataId?.companies?.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setTableData(initData);
    }
  }, [dataId]);

  const handleSave = async () => {
    const fields = [
      { value: name, message: "input Name", valid: true },
      { value: code, message: "input Code", valid: true },
    ];

    const errorMessage = checkEmptyFields(fields);
    if (errorMessage) {
      return showDialog(errorMessage);
    }
    const params = {
      principal_area_id: id,
      area_code: code,
      area_name: name,
      companies: tableData?.map((item) => {
        return {
          company_id: item.company_id,
          is_checked: item.is_checked,
        };
      }),
    };
    try {
      const response =
        id === undefined
          ? await dispatch(addItem(params))
          : await dispatch(editItem(params));
      if (response.payload.status === 200) {
        await showSuccessDialog(response.payload.message);
        (await id) === undefined
          ? history.goBack()
          : await CallApi(paramsId, fetchIdNoloading, dispatch);
      } else {
        showErrorDialog(response.payload.message);
      }
    } catch (error) {
      showErrorDialog(error.message);
      console.log(error.message);
    }
  };

  const columns = [
    {
      text: "no",
      dataField: "no",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "70px" },
      hidden: true,
    },
    {
      text: "company code",
      dataField: "company_code",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "180px" },
    },
    {
      text: "company name",
      dataField: "company_name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "180px" },
    },
    {
      text: "address",
      dataField: "address",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: { minWidth: "180px" },
    },
  ];

  const onSelectRow = {
    mode: "checkbox",
    selected: tableData
      .filter((row) => row.is_checked) // Filter rows where `is_checked` is true
      .map((row) => row.no), // Map to get the row identifiers (e.g., `no`)
    onSelectAll: (isSelect) => {
      const updatedData = tableData.map((row) => ({
        ...row,
        is_checked: isSelect, // Set `is_checked` to true if selecting all, false if deselecting all
      }));
      setTableData(updatedData);
    },
    onSelect: (row, isSelect) => {
      const updatedData = tableData.map((tableRow) =>
        tableRow.company_code === row.company_code
          ? { ...tableRow, is_checked: isSelect } // Update `is_checked` for the specific row
          : tableRow
      );
      setTableData(updatedData);
      return true;
    },
  };

  return loading || loading2 ? (
    <LayoutSplashScreen />
  ) : (
    <>
      <Card>
        <CardHeader>
          <CardHeaderTitle className="card-title">
            {id === undefined ? "Create Area" : "Edit Area"}
          </CardHeaderTitle>
          <CardHeaderToolbar>
            <Button
              className="btn btn-secondary mr-3"
              onClick={() => history.goBack()}
            >
              <i className="fa fa-arrow-left"></i>Back
            </Button>

            <Button
              className="btn btn-danger"
              onClick={(e) => {
                handleSave();
              }}
            >
              Save
            </Button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <Form.Group as={Row}>
              <Col sm={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    <b>
                      Area Code <b className="color-red">*</b>
                    </b>
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                      disabled={id !== undefined ? true : false}
                    />
                  </Col>
                </Form.Group>
              </Col>
              {/* Right Row */}

              <Col sm={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    <b>
                      Area Name <b className="color-red">*</b>{" "}
                    </b>
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Form.Group>
          </Form>

          <ToolkitProvider
            keyField="no"
            data={tableData}
            columns={columns}
            search
          >
            {(props) => (
              <>
                <Row>
                  <Col></Col>
                  <Col>
                    <div className="float-right">
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search .."
                      />
                    </div>
                  </Col>
                </Row>
                <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                  <BootstrapTable
                    striped
                    noDataIndication="Data Not Found"
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    bordered={true}
                    {...props.baseProps}
                    selectRow={onSelectRow}
                  />
                </div>
              </>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
    </>
  );
};
