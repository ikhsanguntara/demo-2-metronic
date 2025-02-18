import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  getId,
  createItem,
  updateItem,
  deleteById,
  uploadItemValidate,
  upload,
  getExport,
} from "./courseAPI";

const initialState = {
  data: [],
  dataId: null,
  loading: false,
  error: null,
  pageNo: 1,
  pageSize: 10,
  totalRecord: 0,
  selected: null,
  result: null,
};

export const fetchData = createAsyncThunk("course/fetchData", async (payload) => {
  const response = await getAll(payload);
  return response;
});

export const fetchCourse = createAsyncThunk("course/fetchCourse", async (payload) => {
  const response = await getAll(payload);
  return response;
});

export const fetchId = createAsyncThunk("course/fetchId", async (id) => {
  const response = await getId(id);
  return response;
});

export const fetchIdNoloading = createAsyncThunk(
  "course/fetchIdNoloading",
  async (id) => {
    const response = await getId(id);
    return response;
  }
);

export const addItem = createAsyncThunk("course/addItem", async (payload) => {
  const response = await createItem(payload);
  return response;
});

export const editItem = createAsyncThunk("course/editItem", async (payload) => {
  const response = await updateItem(payload);
  return response;
});
export const removeById = createAsyncThunk(
  "course/removeById",
  async (payload) => {
    console.log(payload, "payload");
    const response = await deleteById(payload);
    return response;
  }
);

export const uploadValidate = createAsyncThunk(
  "course/uploadValidate",
  async (payload) => {
    const response = await uploadItemValidate(payload);
    return response;
  }
);
export const uploadItem = createAsyncThunk(
  "course/uploadItem",
  async (payload) => {
    const response = await upload(payload);
    return response;
  }
);
export const fetchExport = createAsyncThunk(
  "course/fetchExport",
  async (payload) => {
    const response = await getExport(payload);
    return response;
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetData: () => initialState,
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pageNo = action.payload.data.pageNo;
        state.pageSize = action.payload.data.pageSize;
        state.totalRecord = action.payload.data.totalRecords;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pageNo = action.payload.data.pageNo;
        state.pageSize = action.payload.data.pageSize;
        state.totalRecord = action.payload.data.totalRecords;
      })
      .addCase(fetchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.loading = false;
        state.dataId = action.payload.data.data;
      })
      .addCase(fetchIdNoloading.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchIdNoloading.fulfilled, (state, action) => {
        state.loading = false;
        state.dataId = action.payload.data.data;
      })

      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(editItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(removeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeById.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(uploadItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadItem.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(uploadValidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadValidate.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchExport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExport.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      });
  },
});

export const { resetData, setSelected } = courseSlice.actions;

export const selectData = (state) => state.course.data;
export const selectCourse = (state) => state.course.data;
export const selectId = (state) => state.course.dataId;
export const selectLoading = (state) => state.course.loading;
export const selectError = (state) => state.course.error;
export const selectPageNo = (state) => state.course.pageNo;
export const selectPageSize = (state) => state.course.pageSize;
export const selectTotalRecord = (state) => state.course.totalRecord;
export const selectSelected = (state) => state.course.selected;
export const selectResult = (state) => state.course.result;

export default courseSlice.reducer;
