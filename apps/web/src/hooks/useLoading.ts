import { create } from 'zustand'

type LoadingStore = {
    isLoading: boolean;
    onLoading: (loading: boolean) => void;
};

const useLoading = create<LoadingStore>((set) => ({
    isLoading: false,
    onLoading: (loading) => set({ isLoading: loading }),
}))

export default useLoading