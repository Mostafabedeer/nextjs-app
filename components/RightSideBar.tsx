import NavLinks from "./navigation/navbar/NavLinks";

function RightSideBar() {
  // .div1 {
  //     grid-column: span 2 / span 2;
  //     grid-row: span 9 / span 9;
  // }
  return (
    <div className="hidden sm:block sm:grid-cols-2 sm:grid-rows-9">
      <NavLinks />
    </div>
  );
}

export default RightSideBar;
