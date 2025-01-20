const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "20px",
      }}
    >
      <div
        className="spinner-border"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderColor: "#57137e",
          borderRightColor: "transparent",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <div
        className="spinner-grow"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          backgroundColor: "#57137e",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
