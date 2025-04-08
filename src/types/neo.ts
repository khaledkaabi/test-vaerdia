export interface EstimatedDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }
  
  export interface CloseApproachData {
    orbiting_body: string;
  }

  export interface NEO {
    id: string;
    name: string;
    estimated_diameter: {
      kilometers: EstimatedDiameter;
    };
    close_approach_data: CloseApproachData[];
  }