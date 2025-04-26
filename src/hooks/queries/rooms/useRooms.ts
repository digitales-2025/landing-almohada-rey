// import { bookingOps } from "@/actions/action-setup";
// import { useQuery } from "@tanstack/react-query";

// export const useRooms = () => {
//     const availableRoomsQuery = useQuery({
//         queryKey: ["rooms"],
//         queryFn: async () => {
//             const response = await bookingOps.getAvailableRooms({
//                 checkInDate
//             });
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         },
//     });
//     return {
//         ...query,
//         rooms: query.data,
//     };
// };
