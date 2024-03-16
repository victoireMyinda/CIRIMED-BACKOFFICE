import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllFormations = createAsyncThunk("formations/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/formations`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newFormation = createAsyncThunk("formations/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/formations`, data);
            if (resp && resp.data) {
                toast.success('Formation ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateFormation = createAsyncThunk("formations/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/formations/${data && data.id}`, data && data.form);
            toast.success('Formation modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteFormation = createAsyncThunk("formations/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/formations/${id}`);
            toast.success('Formation supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const formationsSlice = createSlice({
    name: "formations",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {

        [getAllFormations.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllFormations.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllFormations.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
      //  CREATE CLASSIFICATION
        [newFormation.pending]: (state, action) => {
            state.loading = true;
        },
        [newFormation.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newFormation.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
       // UPDATE CLASSIFICATION
         [updateFormation.pending]: (state, action) => {
             state.loading = true;
         },
         [updateFormation.fulfilled]: (state, action) => {
             state.loading = false;
             state.isSuccess = true;
             state.value = state.value.filter(val => {
                 return val._id !== action.payload._id;
             })
             state.value.push(action.payload);
         },
         [updateFormation.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
         // DELETE CLASSIFICATION
         [deleteFormation.pending]: (state, action) => {
             state.loading = true;
         },
         [deleteFormation.fulfilled]: (state, action) => {
             state.loading = false;
             state.value = state.value.filter(val => {
                 return val.id !== action.payload
             })
             state.isSuccess = true;
         },
         [deleteFormation.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
    }
});

export default formationsSlice;