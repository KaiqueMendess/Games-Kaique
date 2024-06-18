<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>
require 'auth.php';
// Código da página
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="stylesheet" href="style/login.css">
    <meta charset="UTF-8">
    <title>Cadastro de Comentário</title>
</head>
<body>
    <?php require 'auth.php'; ?>
    <header class="showcase">
        <div class="formm">
            <form method="POST" action="php/comment_process.php">
                <h1>Comentar</h1>
                <div class="info">
                    <textarea name="comentario" placeholder="Escreva seu comentário" required></textarea>
                </div>
                <div class="btn">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </header>
</body>
</html>

comment.php
-<?php
require_once 'db.php';
require 'auth.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $comentario = filter_input(INPUT_POST, 'comentario', FILTER_SANITIZE_STRING);
    $user_id = $_SESSION['user_id'];

    $stmt = $pdo->prepare("INSERT INTO comentarios (user_id, comentario, aprovado) VALUES (:user_id, :comentario, 0)");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':comentario', $comentario);

    if ($stmt->execute()) {
        echo "Comentário enviado para aprovação.";
    } else {
        echo "Erro ao enviar comentário.";
    }
}
?>
s

admin.php 
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="stylesheet" href="style/login.css">
    <meta charset="UTF-8">
    <title>Painel de Administração</title>
</head>
<body>
    <?php require 'auth.php'; ?>
    <header class="showcase">
        <div class="formm">
            <h1>Painel de Administração</h1>
            <h2>Comentários para Aprovação</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Usuário</th>
                    <th>Comentário</th>
                    <th>Ação</th>
                </tr>
                <?php
                $stmt = $pdo->query("SELECT comentarios.ID, usuarios.login, comentarios.comentario FROM comentarios JOIN usuarios ON comentarios.user_id = usuarios.ID WHERE comentarios.aprovado = 0");
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo "<tr>
                            <td>{$row['ID']}</td>
                            <td>{$row['login']}</td>
                            <td>{$row['comentario']}</td>
                            <td>
                                <form method='POST' action='php/admin_process.php'>
                                    <input type='hidden' name='comentario_id' value='{$row['ID']}'>
                                    <button type='submit' name='action' value='approve'>Aprovar</button>
                                    <button type='submit' name='action' value='reject'>Reprovar</button>
                                </form>
                            </td>
                          </tr>";
                }
                ?>
            </table>
            <h2>Exportar Comentários</h2>
            <form method="POST" action="php/export_comments.php">
                <button type="submit">Exportar JSON</button>
            </form>
            <h2>Importar Comentários</h2>
            <form method="POST" action="php/import_comments.php" enctype="multipart/form-data">
                <input type="file" name="json_file" accept=".json" required>
                <button type="submit">Importar JSON</button>
            </form>
        </div>
    </header>
</body>

</html>
admin_process.php
<?php
require_once 'db.php';
require 'auth.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $comentario_id = filter_input(INPUT_POST, 'comentario_id', FILTER_SANITIZE_NUMBER_INT);
    $action = $_POST['action'];

    if ($action == 'approve') {
        $stmt = $pdo->prepare("UPDATE comentarios SET aprovado = 1 WHERE ID = :id");
    } else if ($action == 'reject') {
        $stmt = $pdo->prepare("DELETE FROM comentarios WHERE ID = :id");
    }

    $stmt->bindParam(':id', $comentario_id);
    if ($stmt->execute()) {
        header('Location: ../admin.php');
    } else {
        echo "Erro ao processar ação.";
    }
}
?>
export comments
<?php
require_once 'db.php';
require 'auth.php';

$stmt = $pdo->query("SELECT * FROM comentarios WHERE aprovado = 1");
$comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
header('Content-Disposition: attachment; filename="comentarios.json"');
echo json_encode($comentarios);
exit();
?>
import comments<?php
require_once 'db.php';
require 'auth.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['json_file'])) {
    $json_file = $_FILES['json_file']['tmp_name'];
    $json_data = file_get_contents($json_file);
    $comentarios = json_decode($json_data, true);

    foreach ($comentarios as $comentario) {
        $stmt = $pdo->prepare("INSERT INTO comentarios (user_id, comentario, aprovado) VALUES (:user_id, :comentario, :aprovado)");
        $stmt->bindParam(':user_id', $comentario['user_id']);
        $stmt->bindParam(':comentario', $comentario['comentario']);
        $stmt->bindParam(':aprovado', $comentario['aprovado']);
        $stmt->execute();
    }

    header('Location: ../admin.php');
}
?>
