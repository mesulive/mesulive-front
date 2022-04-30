import { createStyles, FontWeight, setFont } from "common/utils/styles";
import { COLOR_PRIMARY_MAIN } from "common/assets/colors";

const useStyle = createStyles((theme) => ({
  box: {
    bgcolor: "white",
    padding: "16px",
    borderRadius: "20px",
    boxShadow: "0 0 30px #7176791A",
    marginBottom: "16px",

    "&:last-child": {
      marginBottom: 0,
    },
  },

  title: {
    ...setFont(16, FontWeight.BOLD),
    color: COLOR_PRIMARY_MAIN,
    display: "block",
    margin: "0 0 16px 0",

    [theme.breakpoints.up("laptop")]: setFont(18),
  },
}));

export default useStyle;
