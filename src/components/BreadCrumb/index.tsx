import { Fragment } from "react";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // If you're using React Router

interface Breadcrumb {
  label: string;
  link?: string;
}

interface BreadcrumbsComponentProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsComponentProps) => {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          {breadcrumb.link ? (
            <Link color="inherit" component={RouterLink} to={breadcrumb.link}>
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography color="textPrimary">{breadcrumb.label}</Typography>
          )}
        </Fragment>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
