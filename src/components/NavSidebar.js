/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React from "react";
import { FaChartPie } from "react-icons/fa";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      {/* Sidebar */}
      <div>
        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Home",
              itemId: "/MOSGUITO/home",
              elemBefore: () => <Icon name="coffee" />,
            },
            {
              title: "About",
              itemId: "/MOSGUITO/about",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "The MOSCA project",
                  itemId: "/MOSGUITO/project",
                },
                {
                  title: "Members",
                  itemId: "/MOSGUITO/members",
                },
              ],
            },
            {
              title: "Configuration",
              itemId: "/MOSGUITO/config",
              elemBefore: () => <Icon name="settings" />,
              subNav: [
                {
                  title: "General configuration",
                  itemId: "/MOSGUITO/general-configuration",
                },
                {
                  title: "UniProt columns",
                  itemId: "/MOSGUITO/uniprot-columns",
                },
                {
                  title: "UniProt databases",
                  itemId: "/MOSGUITO/uniprot-databases",
                },
                {
                  title: "KEGG metabolic maps",
                  itemId: "/MOSGUITO/keggmaps",
                },
                {
                  title: "Experiments",
                  itemId: "/MOSGUITO/experiments",
                },
              ],
            },
            {
              title: "Inputs",
              itemId: "/MOSGUITO/inputs",
              elemBefore: () => <Icon name="cloud-snow" />,
              subNav: [
                {
                  title: "Upload Inputs",
                  itemId: "/MOSGUITO/upload_inputs",
                },
                {
                  title: "My Inputs",
                  itemId: "/MOSGUITO/my_inputs",
                },
              ],
            },
            {
              title: "Analyses",
              itemId: "/MOSGUITO/start_server",
              elemBefore: () => <Icon name="power" />,
            },
          ]}
        />

        <div>
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Results",
                itemId: "/MOSGUITO/results",
                elemBefore: () => <FaChartPie />,
              },
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export const ResultsSideBar = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <div>
        <Navigation
          activeItemId={location.pathname}
          items={[
            {
              title: "Results",
              itemId: "/MOSGUITO/results",
              elemBefore: () => <FaChartPie />,
              subNav: [
                {
                  title: "FastQC reports",
                  itemId: "/MOSGUITO/fastqc-reports",
                },
                {
                  title: "Assembly QC",
                  itemId: "/MOSGUITO/assembly-qc",
                },
                {
                  title: "Annotation Results",
                  itemId: "/MOSGUITO/annotation-results",
                },
                {
                  title: "Differential Analysis",
                  itemId: "/MOSGUITO/differential-analysis",
                },
                {
                  title: "KEGGmaps",
                  itemId: "/MOSGUITO/keggmaps-results",
                },
                {
                  title: "EntryReports",
                  itemId: "/MOSGUITO/entry-reports",
                },
                {
                  title: "GeneralReports",
                  itemId: "/MOSGUITO/general-reports",
                },
                {
                  title: "ProteinReports",
                  itemId: "/MOSGUITO/protein-reports",
                },
              ],
            },
          ]}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
        />
      </div>
    </>
  );
};
