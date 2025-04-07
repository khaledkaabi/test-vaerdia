export interface EstimatedDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }
  
  export interface NEO {
    id: string;
    name: string;
    estimated_diameter: {
      kilometers: EstimatedDiameter;
    };
  }