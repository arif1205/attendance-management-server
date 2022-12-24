const router = require("express").Router();
const userController = require("../controller/user");

/**
 * Get a user with id
 * @method GET
 * @returns single user
 */
router.get("/:id", userController.getUserById);

/**
 * Update user with id
 * @method PUT
 * @returns single updated user
 */
router.put("/:id", userController.putUserById);

/**
 * Update user with id
 * @method PATCH
 * @returns single updated user
 */
router.patch("/:id", userController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 * @returns single deleted user
 */
router.delete("/:id", userController.deleteUserById);

/**
 * Get a user with email
 * @method GET
 * @returns single user
 */
router.get("/:email", userController.getUserByEmail);

/**
 * Get all users
 * - Filter
 * - Pagination
 * - Sort
 * - Select Properties
 * @route api/v1/users?sort=['by', 'name']&filter
 * @method GET
 * @returns all users
 * @visibility Private
 */

router.get("/", userController.getUser);

/**
 * Create a new user
 * @method POST
 * @returns single user which creates
 */

router.post("/", userController.postUser);

module.exports = router;
