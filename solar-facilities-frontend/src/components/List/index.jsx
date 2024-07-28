import { List as MuiList } from "@mui/material";
import { Item } from "./Item";
import { Link } from "react-router-dom";

export const List = ({ listOfItems }) => {
  return (
    <MuiList>
      {listOfItems.map((item) => {
        if (item.link) {
          return (
            <Link key={item.text} to={item.link}>
              <Item item={item} />
            </Link>
          );
        }
        return <Item key={item.text} item={item} />;
      })}
    </MuiList>
  );
};
