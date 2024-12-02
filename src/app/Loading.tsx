const LoadingSpinner = () => (
  <div className=" fixed inset-0 backdrop-blur-sm flex items-center justify-center h-screen w-screen">
    <div
      className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"
      role="status"
      aria-label="Loading.."
    />
  </div>
);

export default LoadingSpinner;
