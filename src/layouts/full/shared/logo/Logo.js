import { useSelector, useDispatch } from "react-redux";
import { IconButton, useMediaQuery } from "@mui/material";
import { Icons } from "src/icons";
import { IconMenu2 } from "@tabler/icons";
import { toggleMobileSidebar, toggleSidebar } from "src/store/customizer/CustomizerSlice";

const Logo = ({ isAuthenticated, isSidebar, isCollapsed }) => {
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleSidebarToggle = () => {
    lgUp ? dispatch(toggleSidebar()) : dispatch(toggleMobileSidebar());
  };

  const renderLogo = (isSmall) => {
    return customizer.activeMode === "dark" ? (
      <Icons.DarkLogo className={`${isSmall ? 'logoClassNameSmall' : 'logoClassName'}`} />
    ) : (
      <Icons.LightLogo className={`${isSmall ? 'logoClassNameSmall' : 'logoClassName'}`} />
    );
  };

  if (isSidebar) {
    return (
      <div className={isCollapsed ? "wrapperLogoSidebarCollapsed" : "wrapperLogoSidebar"}>
        {!isCollapsed && renderLogo(true)}
        <IconButton
          color="#4788ff"
          aria-label="menu"
          onClick={handleSidebarToggle}
        >
          <IconMenu2 size="40" color="#4788ff" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="wrapperLogo">
      {renderLogo(false)}
      {!isAuthenticated && (
        <div className="wrapperSignInTitle">
          <div className="titleClassName">Sign In</div>
          <div className="subTitleClassName">
            To keep connected with us, please login with your personal info.
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
