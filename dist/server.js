"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mongoose = require("mongoose");
var cors = require('cors');
var models_1 = __importDefault(require("./models/models"));
// const postRoutes = require('./routes/postRoutes');
var app = express();
var PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
// Routes
// app.use('/api/posts', postRoutes);
// Connect to MongoDB
var uri = "mongodb+srv://prakrit55new:vL0mS2aZTZsUmzYX@cluster0.efaovxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(function () { return console.log("Connected to MongoDB..."); })
    .catch(function (err) { return console.error("Could not connect to MongoDB...", err); });
app.get('/api/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.default.find()];
            case 1:
                posts = _a.sent();
                res.json(posts);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/posts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, models_1.default.findById(id)];
            case 1:
                updatedPost = _a.sent();
                if (!updatedPost) {
                    return [2 /*return*/, res.status(404).json({ message: 'Post not found' })];
                }
                res.json(updatedPost);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Create a new post
app.post('/api/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, author, post, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, content = _a.content, author = _a.author;
                post = new models_1.default({ title: title, content: content, author: author });
                return [4 /*yield*/, post.save()];
            case 1:
                _b.sent();
                res.status(201).json(post); // Return newly created post
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update a post
app.put('/api/posts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, content, author, updatedPost, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, title = _a.title, content = _a.content, author = _a.author;
                return [4 /*yield*/, models_1.default.findByIdAndUpdate(id, { title: title, content: content, author: author }, { new: true })];
            case 1:
                updatedPost = _b.sent();
                if (!updatedPost) {
                    return [2 /*return*/, res.status(404).json({ message: 'Post not found' })];
                }
                res.json(updatedPost);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete a post
app.delete('/api/posts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedPost, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, models_1.default.findByIdAndDelete(id)];
            case 1:
                deletedPost = _a.sent();
                if (!deletedPost) {
                    return [2 /*return*/, res.status(404).json({ message: 'Post not found' })];
                }
                res.json({ message: 'Post deleted successfully' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Start server
var server = app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
// Handle server errors
server.on('error', function (error) {
    console.error('Server error:', error);
    // Handle error more robustly (e.g., exit process, retry logic)
});
exports.default = app; // Export the Express app
