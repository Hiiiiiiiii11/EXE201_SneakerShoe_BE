import userService from '../services/userService.js';

export const handleGetAllRoles = async (req, res) => {
    console.log("Received request for get-all-roles");
    try {
        const response = await userService.GetAllRoles();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            roles: response,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};
export const handleCreateNewRole = async (req, res) => {
    try {
        const response = await userService.CreateARole(req.body);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Create role success",
            role: response.role // Sửa lại cách trả dữ liệu
        });

    } catch (e) {
        console.error("Error in handleCreateNewRole:", e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};
export const handleDeleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        console.error('check id', roleId)
        if (!roleId) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!"
            });
        }
        await userService.DeleteARole(roleId);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Delete role success",
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}
export const handleUpdateRole = async (req, res) => {
    try {
        const id = req.params.id;  // Lấy id từ URL
        const data = req.body;

        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            });
        }

        data.roleId = id; // Gán roleId để truyền vào service

        await userService.updateARole(data);
        return res.status(200).json({
            errCode: 0,
            errMessage: "Update role success",
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};


