import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { ChartData } from "../types/chart";

interface Props {
  data: ChartData[];
}

const NeoTableView: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>NEO Name</TableCell>
            <TableCell align="right">Min Diameter (km)</TableCell>
            <TableCell align="right">Max Diameter (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((neo,index) => (
            <TableRow key={neo.name}>
                <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {neo.name}
              </TableCell>
              <TableCell align="right">{neo.minDiameter.toFixed(2)}</TableCell>
              <TableCell align="right">{neo.maxDiameter.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NeoTableView;
