import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {},
  companyInfo: {},
  planInfo: {},
  submissions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    saveCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
    savePlanInfo: (state, action) => {
      state.planInfo = action.payload;
    },
    addSubmission: (state, action) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { savePersonalInfo, saveCompanyInfo, savePlanInfo , addSubmission  } = formSlice.actions;
export default formSlice.reducer;
