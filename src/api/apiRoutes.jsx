import apiClient from "./Axios";

export const fetchQuestions = async () => {
    const response = await apiClient.get('/question?assessmentType=Full-Stack%20Developer');
    return response?.data?.questions || [];
  };