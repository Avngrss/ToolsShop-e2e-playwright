export const buildProductParams = ({
  page = 1,
  min = 1,
  max = 100,
  isRental = false,
}: {
  page?: number;
  min?: number;
  max?: number;
  isRental?: boolean;
} = {}) => ({
  page,
  between: `price,${min},${max}`,
  is_rental: isRental,
});
