import { ref } from "vue";
import { toolService } from "../api/api";

export interface DepartmentOption {
  id: number | string;
  name: string;
}

type DepartmentApiItem =
  | string
  | {
      id?: unknown;
      department_id?: unknown;
      name?: unknown;
      label?: unknown;
      department?: unknown;
      value?: unknown;
    };

function normalizeDepartment(
  dept: DepartmentApiItem,
  index: number,
): DepartmentOption | null {
  if (typeof dept === "string") {
    const name = dept.trim();
    if (!name) return null;
    return {
      id: index,
      name,
    };
  }

  if (dept && typeof dept === "object") {
    const idCandidate = dept.id ?? dept.department_id;
    const nameCandidate =
      dept.name ?? dept.label ?? dept.department ?? dept.value;

    if (
      (typeof idCandidate === "number" || typeof idCandidate === "string") &&
      typeof nameCandidate === "string"
    ) {
      const name = nameCandidate.trim();
      if (!name) return null;
      return {
        id: idCandidate,
        name,
      };
    }
  }

  return null;
}

function isDepartmentOption(
  dept: DepartmentOption | null,
): dept is DepartmentOption {
  return dept !== null;
}

export function useDepartments() {
  const departments = ref<DepartmentOption[]>([]);
  const loading = ref(false);

  async function fetchDepartments() {
    loading.value = true;
    try {
      const response = await toolService.getDepartments();
      if (Array.isArray(response.data)) {
        departments.value = response.data
          .map((dept: DepartmentApiItem, index: number) =>
            normalizeDepartment(dept, index),
          )
          .filter(isDepartmentOption);
      } else {
        console.error("Données de départements invalides :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des départements :", error);
    } finally {
      loading.value = false;
    }
  }

  return {
    departments,
    loading,
    fetchDepartments,
  };
}
