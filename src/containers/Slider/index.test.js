import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  
  it("a list card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    window.console.error = jest.fn();
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    const titleDisplayed= await screen.findByText("World economic forum");
    expect(titleDisplayed).toBeInTheDocument();
// mock ne fonctionne pas
    const dateDisplayed= await screen.findByText("janvier"); 
    expect(dateDisplayed).toBeInTheDocument();

    const infoDisplayed= await screen.findByText("Oeuvre à la coopération entre le secteur public et le privé.");
    expect(infoDisplayed).toBeInTheDocument();
  });

});
