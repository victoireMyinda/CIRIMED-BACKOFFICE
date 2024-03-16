import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllImages = createAsyncThunk("images/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/images`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newImage = createAsyncThunk("images/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/images`, data);
            if (resp && resp.data) {
                toast.success('Image ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateImage = createAsyncThunk("images/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/images/${data && data.id}`, data && data.form);
            toast.success('Image modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteImage = createAsyncThunk("images/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/images/${id}`);
            toast.success('Image supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const imageSlice = createSlice({
    name: "images",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL CATEGORIES
        [getAllImages.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllImages.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllImages.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newImage.pending]: (state, action) => {
            state.loading = true;
        },
        [newImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newImage.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteImage.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteImage.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateImage.pending]: (state, action) => {
            state.loading = true;
        },
        [updateImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateImage.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default imageSlice;