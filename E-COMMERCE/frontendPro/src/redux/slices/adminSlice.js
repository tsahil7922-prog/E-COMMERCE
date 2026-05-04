import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";


// fetch all the users(admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response?.data;
  } catch (err) {
    console.error(err, "");
  }
});

// add the create user action
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejetWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response?.data;
    } catch (err) {
      console.error(err, "");
      return rejetWithValue(error.response.data);
    }
  },
);

// update the user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (id, name, email, role, { rejetWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response?.data;
    } catch (err) {
      console.error(err, "");
      return rejetWithValue(error.response.data);
    }
  },
);

// delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response?.data;
  } catch (err) {
    console.error(err, "");
    return rejetWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, actiion) => {
        state.loading = false;
        state.users = actiion.payload;
      })
      .addCase(fetchUsers.rejected, (state, actiion) => {
        state.loading = false;
        state.error = actiion.error.message;
      })

      .addCase(updateUser.fulfilled, (state, actiion) => {
        const updatedUser = actiion.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updateUser._id,
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updateUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, actiion) => {
        state.user = state.users.filter((user) => user._id !== actiion.payload);
      })
      .addCase(addUser.pending,(state)=>{
        state.loading =true
        state.error =null
      })



       .addCase(addUser.fulfilled,(state,action)=>{
        state.loading =false
        state.users.push(action.payload.user) //add anew user to the state
      })


       .addCase(addUser.rejected,(state,actiion)=>{
        state.loading =false
        state.error =error.payload.message
      })
  },
});



export default adminSlice.reducer
